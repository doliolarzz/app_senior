from django.shortcuts import render
from rest_framework.views import APIView
import os
import zipfile

path = './extracted'

class getRange(APIView):
    
    def get(self, request):
        None

class getData(APIView):
    
    def get(self, request):
        None

class getMetrics(APIView):
    
    def get(self, request):
        None

#Zip and resp front read using zipjs