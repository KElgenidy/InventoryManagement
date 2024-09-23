from django.contrib import admin

# Register your models here.
from .models import Warehouse, Product, Inventory
admin.site.register(Warehouse)
admin.site.register(Product)
admin.site.register(Inventory)

