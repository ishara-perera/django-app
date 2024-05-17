# # serializers.py
# from rest_framework import serializers
# from accounts.models import UserAccount
# from client.models import ClientProfile
# from djoser.serializers import UserSerializer as BaseUserSerializer

# class CustomUserSerializer(BaseUserSerializer):
#     id = serializers.SerializerMethodField(read_only=True)
#     first_name = serializers.SerializerMethodField(read_only=True)
#     last_name = serializers.SerializerMethodField(read_only=True)
#     email = serializers.SerializerMethodField(read_only=True)
#     role = serializers.SerializerMethodField(read_only=True)
#     profile_image = serializers.SerializerMethodField(read_only=True)
#     class Meta:
#         model = UserAccount
#         fields = ['id', 'first_name', 'last_name', 'email', 'role', 'profile_image']

#     def get_id(self, obj):
#         return obj.id
    
#     def get_first_name(self, obj):
#         clientProfile = ClientProfile.objects.get(userAccount = obj.id)
#         return clientProfile.first_name
    
#     def get_last_name(self, obj):
#         clientProfile = ClientProfile.objects.get(userAccount = obj.id)
#         return clientProfile.last_name
    
#     def get_email(self, obj):
#         return obj.email
    
#     def get_role(self, obj):
#         clientProfile = ClientProfile.objects.get(userAccount = obj.id)
#         return clientProfile.designation

#     def get_profile_image(self, obj):
#         clientProfile = ClientProfile.objects.get(userAccount = obj.id)
#         profile_image = clientProfile.profile_image.url

#         return profile_image

# # Client User Serializer
# class ClientUserSerializer(serializers.ModelSerializer):
#     id = serializers.SerializerMethodField(read_only=True)
#     first_name = serializers.SerializerMethodField(read_only=True)
#     last_name = serializers.SerializerMethodField(read_only=True)
#     email = serializers.SerializerMethodField(read_only=True)
#     role = serializers.SerializerMethodField(read_only=True)
#     profile_image = serializers.SerializerMethodField(read_only=True)

#     class Meta:
#         model = UserAccount
#         fields = ['id', 'first_name', 'last_name', 'email', 'role', 'profile_image']

#     def get_id(self, obj):
#         return obj.id
    
#     def get_first_name(self, obj):
#         clientProfile = ClientProfile.objects.get(userAccount = obj.id)
#         return clientProfile.first_name
    
#     def get_last_name(self, obj):
#         clientProfile = ClientProfile.objects.get(userAccount = obj.id)
#         return clientProfile.last_name
    
#     def get_email(self, obj):
#         return obj.email
    
#     def get_role(self, obj):
#         clientProfile = ClientProfile.objects.get(userAccount = obj.id)
#         return clientProfile.designation

#     def get_profile_image(self, obj):
#         clientProfile = ClientProfile.objects.get(userAccount = obj.id)
#         profile_image = clientProfile.profile_image.url

#         return profile_image
    
# # class ClientUserSerializerWithToken(ClientUserSerializer):
# #     token = serializers.SerializerMethodField(read_only=True)
# #     class Meta:
# #         model = UserAccount
# #         fields = ['id', 'first_name', 'last_name', 'email', 'role', 'profile_image', 'token']

# #     def get_token(self, obj):
# #         token = RefreshToken.for_user(obj)
# #         return str(token.access_token)
    