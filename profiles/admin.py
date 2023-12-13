from django.contrib import admin
from .models import Profile
from posts.models import Post, Ingredient

admin.site.register(Profile)
class IngredientInline(admin.TabularInline):
    model = Post.ingredients.through

class PostAdmin(admin.ModelAdmin):
    inlines = [IngredientInline]

admin.site.register(Post, PostAdmin)
admin.site.register(Ingredient)