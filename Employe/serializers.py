from rest_framework import serializers
from Employe.models import Department,Employee

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('DepartmentID','DepartmentName')

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('EmployeeID','EmployeeName','Department','DateOfJoining','PhotoFileName')