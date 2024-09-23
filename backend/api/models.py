from django.db import models

# Create your models here.
# creating a inventory management system

# Warehouse
class Warehouse(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=150)
    capacity = models.IntegerField()
    def __str__(self):
        return self.name
    
# Product
class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=150)
    price = models.IntegerField()

    def __str__(self):
        return self.name
    
# Inventory 
class Inventory(models.Model):
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('warehouse', 'product')

    def __str__(self):
       return f"{self.product.name} at {self.warehouse.name}: {self.quantity}"
    
# PurchaseOrder
class PurchaseOrder(models.Model):
    supplier = models.CharField(max_length=100)
    order_date = models.DateField()
    expected_delivery_date = models.DateField()

    def __str__(self):
        return f"Purchase Order #{self.id}"
    
# PurchaseOrderItem
class PurchaseOrderItem(models.Model):
    purchase_order = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product.name} - {self.quantity}"
    
# SalesOrder
class SaleOrder(models.Model):
    customer = models.CharField(max_length=100)
    order_date = models.DateField()
    def __str__(self):
        return f"Sale Order #{self.id}"

# SaleOrderItem
class SaleOrderItem(models.Model):
    sale_order = models.ForeignKey(SaleOrder, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product.name} - {self.quantity}"
    
