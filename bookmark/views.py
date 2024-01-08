from rest_framework import generics, permissions
from pp5_api.permissions import IsOwnerOrReadOnly
from .models import Bookmark
from bookmark.serializers import BookmarkSerializer


class BookmarkList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = BookmarkSerializer
    queryset = Bookmark.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class BookmarkDetail(generics.RetrieveDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = BookmarkSerializer
    queryset = Bookmark.objects.all()