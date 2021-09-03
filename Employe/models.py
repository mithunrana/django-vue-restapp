from django.db import models

class Department(models.Model):
    DepartmentID = models.AutoField(primary_key=True)
    DepartmentName = models.CharField(max_length=255)

class Employee(models.Model):
    EmployeeID = models.AutoField(primary_key=True)
    EmployeeName = models.CharField(max_length=255)
    Department = models.CharField(max_length=255)
    DateOfJoining = models.DateField()
    PhotoFileName = models.CharField(max_length=255)

