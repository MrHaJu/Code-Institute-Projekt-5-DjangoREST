from rest_framework import serializers
from posts.models import Post, Bookmark
from likes.models import Like
from comments.models import Comment


class PostSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    like_id = serializers.SerializerMethodField()
    likes_count = serializers.ReadOnlyField()
    comments_count = serializers.ReadOnlyField()
    ingredients = serializers.CharField(source='get_formatted_ingredients', read_only=True)
    bookmarks_count = serializers.SerializerMethodField()

    def validate_image(self, value):
        if value.size > 1024 * 1024 *2:
            raise serializers.ValidationError(
                'Image size larger than 2MB!'
            )
        if value.image.width > 4096:
            raise serializers.ValidationError(
                'Image width larger than 4096px!'
            )
        if value.image.height > 4096:
            raise serializers.ValidationError(
                'Image height larger than 4096px!'
            )
        return value
    
    def get_bookmarks_count(self, obj):
        return obj.bookmark_set.count()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner
    
    def get_like_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            like = Like.objects.filter(
                owner=user, post=obj
            ).first()
            return like.id if like else None
        return None

    class Meta:
        model = Post
        fields = [
            'id', 'owner', 'is_owner', 'profile_id',
            'profile_image', 'created_at', 'updated_at',
            'title', 'content', 'image', 'image_filter',
            'like_id', 'likes_count', 'comments_count', 'ingredients',  'bookmarks_count',
        ]

class PostDetailSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    like_id = serializers.SerializerMethodField()
    likes_count = serializers.ReadOnlyField()
    comments_count = serializers.ReadOnlyField()
    ingredients = serializers.CharField(allow_blank=True)
    bookmarked = serializers.SerializerMethodField()
    bookmark_checkbox = serializers.BooleanField(write_only=True, required=False)


    def validate_image(self, value):
        if value.size > 1024 * 1024 *2:
            raise serializers.ValidationError(
                'Image size larger than 2MB!'
            )
        if value.image.width > 4096:
            raise serializers.ValidationError(
                'Image width larger than 4096px!'
            )
        if value.image.height > 4096:
            raise serializers.ValidationError(
                'Image height larger than 4096px!'
            )
        return value
    
    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner
    
    def get_like_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            like = Like.objects.filter(
                owner=user, post=obj
            ).first()
            return like.id if like else None
        return None

    def get_bookmarked(self, obj):
        user = self.context['request'].user
        return obj.bookmark_set.filter(user=user).exists()

    def validate(self, data):
        bookmark_checkbox = data.get('bookmark_checkbox', False)
        if not self.instance and not bookmark_checkbox:
            raise serializers.ValidationError('Bookmark checkbox is required.')
        return data

    def create(self, validated_data):
        user = self.context['request'].user
        bookmark_checkbox = validated_data.pop('bookmark_checkbox', False)

        post = super(PostDetailSerializer, self).create(validated_data)

        if bookmark_checkbox:
            # create bookmark for logged in user
            Bookmark.objects.create(user=user, post=post)

        return post

    def update(self, instance, validated_data):
        user = self.context['request'].user
        bookmark_checkbox = validated_data.pop('bookmark_checkbox', False)

        instance = super(PostDetailSerializer, self).update(instance, validated_data)

        if bookmark_checkbox:
            # if bookmark_checkbox is True, add 1 bookmark 
            Bookmark.objects.get_or_create(user=user, post=instance)
        else:
            # if bookmark_checkbox is False , delete 1 bookmark
            Bookmark.objects.filter(user=user, post=instance).delete()

        return instance

    class Meta:
        model = Post
        fields = [
            'id', 'owner', 'is_owner', 'profile_id',
            'profile_image', 'created_at', 'updated_at',
            'title', 'content', 'image', 'image_filter',
            'like_id', 'likes_count', 'comments_count', 'ingredients', 'bookmarked', 'bookmark_checkbox',
        ]
    
