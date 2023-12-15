from django.urls import path
from posts import views

urlpatterns = [
    path('posts/', views.PostList.as_view()),
    path('posts/<int:pk>/', views.PostDetail.as_view()),
    path('posts/<int:post_id>/bookmark/', views.bookmark_post, name='bookmark-post'),
    path('posts/<int:post_id>/unbookmark/', views.unbookmark_post, name='unbookmark-post'),
]