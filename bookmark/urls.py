from django.urls import path
from bookmark import views

urlpatterns = [
    path('bookmark/', views.BookmarkList.as_view()),
    path('bookmark/<int:pk>/', views.BookmarkDetail.as_view()),
]