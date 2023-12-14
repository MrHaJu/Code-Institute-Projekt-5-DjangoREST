from django.db.models import Count
from rest_framework import generics, permissions, filters, status
from django_filters.rest_framework import DjangoFilterBackend
from pp5_api.permissions import IsOwnerOrReadOnly
from .models import Post
from .serializers import PostSerializer, PostDetailSerializer
from rest_framework.response import Response


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
        # Zerlegen Sie die Zutaten im Eingabefeld in eine Liste
        ingredients_input = ingredients_input.split(',')
        # Wenn es bereits vorhandene Inhalte gibt, füge das Neue hinzu
        if serializer.instance and serializer.instance.ingredients:
            existing_ingredients = serializer.instance.ingredients.split(',')

        # Erstellen Sie eine neue Liste, die die Zutaten aus dem Eingabefeld und dem Post enthält
            ingredients = existing_ingredients + ingredients_input

        # Entfernen Sie doppelte Zutaten aus der Liste
            ingredients = list(set(ingredients))
        else:
            ingredients = ingredients_input


        # Setzen Sie das 'ingredients' im Serializer auf die kombinierten Werte
        serializer.validated_data['ingredients'] = ', '.join(ingredients)

        # Führen Sie die Standard-Perform-Create-Methode aus
        instance = serializer.save(owner=self.request.user)

        # Hinweis: Lassen Sie das 'ingredients' im Serializer unverändert
        serializer.validated_data['ingredients'] = instance.ingredients