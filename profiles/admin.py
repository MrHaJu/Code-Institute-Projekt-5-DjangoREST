from django.contrib import admin
from .models import Profile
from posts.models import Post, Bookmark

admin.site.register(Profile)

class BookmarkInline(admin.TabularInline):  # oder admin.StackedInline, je nach deinen Präferenzen
    model = Bookmark
    extra = 0  # Zeigt keine leeren Formulare an, wenn keine Bookmarks vorhanden sind
    readonly_fields = ('user', 'created_at')  # Nur Lesezugriff auf Benutzer und Erstellungsdatum

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'owner', 'title', 'created_at', 'updated_at')
    search_fields = ('owner__username', 'title', 'content')  # Füge Felder hinzu, nach denen im Admin gesucht werden kann
    list_filter = ('created_at', 'updated_at')  # Füge Filter für das Erstellungs- und Aktualisierungsdatum hinzu
    readonly_fields = ('id', 'owner', 'created_at', 'updated_at')  # Setze Felder, die nur gelesen werden können
    
@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'post', )
    search_fields = ('user__username', 'post__title')
    readonly_fields = ('id', 'user', 'post', )