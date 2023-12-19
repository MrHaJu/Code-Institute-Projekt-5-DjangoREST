from django.contrib import admin
from .models import Profile
from posts.models import Post, Bookmark

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'email']  

class BookmarkInline(admin.TabularInline):  
    model = Bookmark
    extra = 0  
    readonly_fields = ('user', 'created_at')  

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'owner', 'title', 'created_at', 'updated_at')
    search_fields = ('owner__username', 'title', 'content')  
    list_filter = ('created_at', 'updated_at')  
    readonly_fields = ('id', 'created_at', 'updated_at')
    inlines = [BookmarkInline]  # Hier füge das Inline-Element hinzu

@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'post', 'get_bookmark_count' )
    search_fields = ('user__username', 'post__title')
    readonly_fields = ('id', 'user', 'post', )
    
    def get_bookmark_count(self, obj):
        return obj.bookmarks.count()

    get_bookmark_count.short_description = 'Bookmark Count'
