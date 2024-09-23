from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import WarehouseSerializer, ProductSerializer, InventorySerializer, PurchaseOrderSerializer, PurchaseOrderItemSerializer, SaleOrderSerializer, SaleOrderItemSerializer
from .models import Warehouse, Product, Inventory, PurchaseOrder, PurchaseOrderItem, SaleOrderItem, SaleOrder

# Create your views here.
# Products
@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    if products is None:
        return Response({'message': 'No Products in the List'}, status=404)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=200)

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(id=pk)
    if product is None:
        return Response({'message': 'Product not found'}, status=404)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data, status=200)

@api_view(['POST'])
def createProduct(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data, status=201)

@api_view(['PUT'])
def updateProduct(request, pk):
    product = Product.objects.get(id=pk)
    serializer = ProductSerializer(instance=product, data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=400)
    return Response(serializer.data, status=200)

@api_view(['DELETE'])
def deleteProduct(request, pk):
    product = Product.objects.get(id=pk)
    product.delete()
    return Response({'message': 'Product deleted'}, status=200)

