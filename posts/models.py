from django.db import models
from django.contrib.auth.models import User
from django.db import connection


class Post(models.Model):
    """
    Post model, related to 'owner', i.e. a User instance.
    Default image set so that we can always reference image.url.
    """
    image_filter_choices = [
    ('_1977', '1977'),
    ('brannan', 'Brannan'),
    ('earlybird', 'Earlybird'),
    ('hudson', 'Hudson'),
    ('inkwell', 'Inkwell'),
    ('lofi', 'Lo-Fi'),
    ('kelvin', 'Kelvin'),
    ('normal', 'Normal'),
    ('nashville', 'Nashville'),
    ('rise', 'Rise'),
    ('toaster', 'Toaster'),
    ('valencia', 'Valencia'),
    ('walden', 'Walden'),
    ('xpro2', 'X-pro II')
    ]
    
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True)
    ingredients = models.TextField(blank=True)
    image = models.ImageField(
        upload_to='images/', default='../https://res.cloudinary.com/db6t1xmmn/image/upload/v1702027584/PP5/t6rrcjmjznyvnodygcdn.jpg', blank=True
    )
    image_filter = models.CharField(
        max_length=32, choices=image_filter_choices, default='normal'
    )

    def get_formatted_ingredients(self):
        # Implementiere diese Methode, um die Liste der Zutaten im gewünschten Format zurückzugeben
        # Hier ist ein einfaches Beispiel, das auf einem "ingredients"-Feld basiert
        return ', '.join(self.ingredients.split(','))
    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.title}'
    
class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey('posts.Post', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def get_bookmarks(self):
        return self.bookmark_set.all()
