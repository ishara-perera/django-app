from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from ..models import Product, Order
from ..serializers import ProductSerializer, OrderSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def get_products(request):
    try:
        # Get query parameters
        query_params = request.query_params
        limit = int(query_params.get('limit', 30))
        page = int(query_params.get('page', 1))
        search = query_params.get('search')

        # Get all the products
        products = Product.objects.all()

        # Apply search filter
        # if search:
        #     search_filters = {}
        #     for param in search.split(';'):
        #         key, value = param.split(':')
        #         if key != 'slug':
        #             search_filters[key] = value
        #     products = products.filter(**search_filters)
        search_filters = {}
        for param in search.split(';'):
            key, value = param.split(':')
            if key == 'type.slug':  # Check if the key is 'type.slug'
                search_filters['type__slug'] = value  # Use '__' to traverse the relationship
            elif key != 'slug':
                search_filters[key] = value

        # Then apply the filters to the queryset
        products = products.filter(**search_filters)

        # Paginate results
        paginator = Paginator(products, limit)
        paginated_products = paginator.get_page(page)

        # Serialize the paginated products
        serializer = ProductSerializer(paginated_products, many=True)

        # Construct next page URL
        next_page_url = None
        if paginated_products.has_next():
            next_page_url = f"{request.path}?{query_params.urlencode()}&page={page + 1}"

        # Construct previous page URL
        previous_page_url = None
        if paginated_products.has_previous():
            previous_page_url = f"{request.path}?{query_params.urlencode()}&page={page - 1}"

        return Response({
            'data': serializer.data,
            'next': next_page_url,
            'previous': previous_page_url
        })

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_product_by_slug(request, slug):
    try:
        # Retrieve the product based on the provided slug
        product = get_object_or_404(Product, slug=slug)
        
        # Retrieve related products
        related_products = Product.objects.filter(type__slug=product.type.slug)[:20]

        # Serialize the product and related products
        product_serializer = ProductSerializer(product)
        related_products_serializer = ProductSerializer(related_products, many=True)

        # Construct the response data
        response_data = {
            'product': product_serializer.data,
            'related_products': related_products_serializer.data
        }

        return JsonResponse(response_data)

    except Product.DoesNotExist:
        return JsonResponse({'error': 'Product not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
@api_view(['GET'])
def get_popular_products(request, limit, type_slug=None):
    try:
        # Initialize queryset for popular products
        popular_products = Product.objects.filter(popular_product=True)
        
        # Filter by type slug if provided
        if type_slug:
            popular_products = popular_products.filter(type__slug=type_slug)

        # Limit the number of results
        popular_products = popular_products[:limit]

        # Serialize the popular products
        serializer = ProductSerializer(popular_products, many=True)

        return Response(serializer.data)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
