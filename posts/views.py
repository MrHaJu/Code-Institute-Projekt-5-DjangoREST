from django.db.models import Count
from rest_framework import generics, permissions, filters, status
from django_filters.rest_framework import DjangoFilterBackend
from pp5_api.permissions import IsOwnerOrReadOnly
from .models import Post, Bookmark
from .serializers import PostSerializer, PostDetailSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404

class PostList(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
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
    """
    Retrieve a post and edit or delete it if you own it.
    """
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

    def put(self, request, *args, **kwargs):
        post = self.get_object()
        serializer = PostDetailSerializer(
            post, data=request.data, context={'request': request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        post = self.get_object()
        post.delete()
        return Response(
            status=status.HTTP_204_NO_CONTENT
        )
        
    def perform_create(self, serializer):
        ingredients_input = self.request.data.get('ingredients', '')
        # split ingredients entry in list
        ingredients_input = ingredients_input.split(',')
        # if entries there, update them
        if serializer.instance and serializer.instance.ingredients:
            existing_ingredients = serializer.instance.ingredients.split(',')

        # create new list with ingredients from input field
            ingredients = existing_ingredients + ingredients_input

        # delete double entries
            ingredients = list(set(ingredients))
        else:
            ingredients = ingredients_input


        # sets 'ingredients' in Serializer to combined values
        serializer.validated_data['ingredients'] = ', '.join(ingredients)

        # save data
        instance = serializer.save(owner=self.request.user)

        
        serializer.validated_data['ingredients'] = instance.ingredients
    
    def patch(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
    
    # Bookmark handling
        bookmark_checkbox = serializer.validated_data.get('bookmark_checkbox', False)
        if bookmark_checkbox:
            user = request.user
            if not instance.bookmark_set.filter(user=user).exists():
                Bookmark.objects.create(post=instance, user=user)
            else:
                instance.bookmark_set.filter(user=user).delete()
    
        self.perform_update(serializer)
    
        return Response(serializer.data)
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