from django.db.models import Count
from rest_framework import generics, permissions, filters, status
from django_filters.rest_framework import DjangoFilterBackend
from pp5_api.permissions import IsOwnerOrReadOnly
from .models import Post, Bookmark
from .serializers import PostSerializer, PostDetailSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

class PostList(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Post.objects.annotate(
        likes_count=Count('likes', distinct=True),
        comments_count=Count('comment', distinct=True)
    ).order_by('-created_at')
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend,
    ]
    filterset_fields = [
        'owner__followed__owner__profile',
        'likes__owner__profile',
        'owner__profile',
    ]
    search_fields = [
        'owner__username',
        'title',
    ]
    ordering_fields = [
        'likes_count',
        'comments_count',
        'likes__created_at',
    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostDetailSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Post.objects.annotate(
        likes_count=Count('likes', distinct=True),
        comments_count=Count('comment', distinct=True)
    ).order_by('-created_at')

    def get(self, request, *args, **kwargs):
        post = self.get_object()
        serializer = PostDetailSerializer(
            post, context={'request': request}
        )
        return Response(serializer.data)

    def perform_update(self, serializer):
        ingredients_input = self.request.data.get('ingredients', '')
        ingredients_input = ingredients_input.split(',')

        if serializer.instance and serializer.instance.ingredients:
            existing_ingredients = serializer.instance.ingredients.split(',')
            ingredients = existing_ingredients + ingredients_input
            ingredients = list(set(ingredients))
        else:
            ingredients = ingredients_input

        serializer.validated_data['ingredients'] = ', '.join(ingredients)
        serializer.save(owner=self.request.user)

    def delete(self, request, *args, **kwargs):
        post = self.get_object()
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def bookmark_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    user = request.user

    if not post.bookmark_set.filter(user=user).exists():
        Bookmark.objects.create(post=post, user=user)
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def unbookmark_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    user = request.user

    try:
        bookmark = Bookmark.objects.get(post=post, user=user)
        bookmark.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Bookmark.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def post_bookmark_status(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    user = request.user


    bookmarked = post.bookmark_set.filter(user=user).exists()


    data = {'bookmarked': bookmarked}
    return Response(data)
