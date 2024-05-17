from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from ..models import Product, Order
from ..serializers import OrderSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.utils import timezone
import uuid

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_orders(request):
    orders = Order.objects.filter(created_by=request.user)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    # Extract the list of order objects from the request data
    orders_data = request.data

    # List to hold the created order objects
    created_orders = []

    for order_data in orders_data:
        # Extract product ID from the order data
        product_id = order_data.get('_id')

        # Check if the product ID is provided
        if product_id is None:
            return Response({'error': 'Product ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Get the product instance using the ID
        try:
            product = Product.objects.get(pk=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Generate a unique order number
        order_number = timezone.now().strftime('%Y%m%d%H%M%S') + str(uuid.uuid4().int)[:6]

        # Add product and order number to the order data
        order_data['product'] = product_id
        order_data['product_name'] = product.name
        order_data['order_number'] = order_number

        # Create the serializer instance with updated order data
        serializer = OrderSerializer(data=order_data)

        if serializer.is_valid():
            serializer.save(created_by=request.user)
            created_orders.append(serializer.data)
        else:
            # If any order data is invalid, return error response
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Return list of created orders
    return Response(created_orders, status=status.HTTP_201_CREATED)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_order(request):
#     # Extract the product ID from the request data
#     product_id = request.data.get('product_id')

#     # Check if the product ID is provided
#     if product_id is None:
#         return Response({'error': 'Product ID is required.'}, status=status.HTTP_400_BAD_REQUEST)

#     # Get the product instance using the ID
#     try:
#         product = Product.objects.get(pk=product_id)
#     except Product.DoesNotExist:
#         return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)

#     # Add the product instance to the request data
#     request.data['product'] = product_id
#     request.data['product_name'] = product.name

#     # Generate a unique order number (for example, using a combination of timestamp and UUID)
#     order_number = timezone.now().strftime('%Y%m%d%H%M%S') + str(uuid.uuid4().int)[:6]
    
#     # Add the generated order number to the request data
#     request.data['order_number'] = order_number

#     # Create the serializer instance with updated request data
#     serializer = OrderSerializer(data=request.data)

#     if serializer.is_valid():
#         serializer.save(created_by=request.user)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_order(request, pk):
    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = OrderSerializer(order, data=request.data)
    if serializer.is_valid():
        serializer.save(updated_by=request.user)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_order(request, pk):
    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    order.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)