from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from Employe.models import Department,Employee
from Employe.serializers import DepartmentSerializer, EmployeeSerializer
from django.core.files.storage import default_storage



@csrf_exempt
def departmentAPI(request,id=0):
    if request.method == 'GET':
        departments = Department.objects.all()
        departments_serializer = DepartmentSerializer(departments, many = True)
        return JsonResponse(departments_serializer.data,safe=False)
    elif request.method == 'POST':
        department_data = JSONParser().parse(request)
        departments_serializer = DepartmentSerializer(data = department_data)
        if departments_serializer.is_valid():
            departments_serializer.save()
            return JsonResponse('Department Added Successfully',safe=False)
        return JsonResponse('Faield to add',safe=False)
    elif request.method == 'PUT':
        department_data = JSONParser().parse(request)
        selectedepartment = Department.objects.get(DepartmentID = department_data['DepartmentID'] )
        departments_serializer = DepartmentSerializer(selectedepartment,data = department_data)
        if departments_serializer.is_valid():
            departments_serializer.save()
            return JsonResponse('Department Update Successfully',safe=False)
        return JsonResponse('Faield to add',safe=False)
    elif request.method == 'DELETE':
        selectedepartment = Department.objects.get(DepartmentID = id)
        selectedepartment.delete()
        return JsonResponse('Department Delete Successfully',safe=False)



@csrf_exempt
def employeeAPI(request,id=0):
    if request.method == 'GET':
        employees = Employee.objects.all()
        employees_serializer = EmployeeSerializer(employees, many = True)
        return JsonResponse(employees_serializer.data,safe=False)
    elif request.method == 'POST':
        employee_data = JSONParser().parse(request)
        employees_serializer = EmployeeSerializer(data = employee_data)
        if employees_serializer.is_valid():
            employees_serializer.save()
            return JsonResponse('Employee Added Successfully',safe=False)
        return JsonResponse('Faield to add',safe=False)
    elif request.method == 'PUT':
        employee_data = JSONParser().parse(request)
        selectedeemployee = Employee.objects.get(EmployeeID = employee_data['EmployeeID'] )
        employees_serializer = EmployeeSerializer(selectedeemployee,data = employee_data)
        if employees_serializer.is_valid():
            employees_serializer.save()
            return JsonResponse('Employee Update Successfully',safe=False)
        return JsonResponse('Faield to add',safe=False)
    elif request.method == 'DELETE':
        selectedeemployee = Employee.objects.get(EmployeeID = id)
        selectedeemployee.delete()
        return JsonResponse('Employee Delete Successfully',safe=False)

@csrf_exempt
def saveFile(request):
    file = request.FILES['file']
    file_name = default_storage.save(file.name,file)
    return JsonResponse(file_name,safe=False)

@csrf_exempt
def SaveFile(request):
    file=request.FILES['file']
    file_name=default_storage.save(file.name,file)
    return JsonResponse(file_name,safe=False)

