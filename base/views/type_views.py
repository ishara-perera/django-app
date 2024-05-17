from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from ..models import Type
from ..serializers import TypeSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

@api_view(['GET'])
def get_types(request):
    text = request.query_params.get('text')
    search = request.query_params.get('search')
    
    types = Type.objects.all()
    
    if text:
        types = types.filter(name__icontains=text)  # Adjust the field name as per your model
        
    if search:
        search_params = {}
        for param in search.split(';'):
            key, value = param.split(':')
            if key != 'slug':
                search_params[key] = value

        types = types.filter(**search_params)
    
    # Serialize the types
    serializer = TypeSerializer(types, many=True)
    return Response(serializer.data)