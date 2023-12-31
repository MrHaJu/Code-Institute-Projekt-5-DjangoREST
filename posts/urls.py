from django.urls import path
from posts import views
from .views import post_bookmark_status

urlpatterns = [
    path('posts/', views.PostList.as_view()),
    path('posts/<int:pk>/', views.PostDetail.as_view()),
    path('posts/<int:post_id>/bookmark/', views.bookmark_post, name='bookmark-post'),
    path('posts/<int:post_id>/unbookmark/', views.unbookmark_post, name='unbookmark-post'),
    path('posts/<int:post_id>/bookmark_status/', post_bookmark_status, name='post_bookmark_status'),
]