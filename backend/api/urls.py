from django.urls import path
from .views import *

urlpatterns = [
    path('products/', getProducts, name="products"),
    path('product/<int:pk>/', getProduct, name="product"),
    path('product/create/', createProduct, name="create_product"),
    path('product/update/<int:pk>/', updateProduct, name="update_product"),
    path('product/delete/<int:pk>/', deleteProduct, name="delete_product"),
]
