from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
import os
import base64
import numpy as np

path = './extracted'

class Data(APIView):
    
    def get(self, request):
        dt = request.query_params.get('dt')
        itype = request.query_params.get('itype')
        n = request.query_params.get('n')
        if (dt is None) or (itype not in ['pred', 'label']) or (n is None):
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        img = os.path.join(path, dt, itype, n + '.png')
        encoded = base64.b64encode(open(img, 'rb').read())
        return JsonResponse({'img': encoded.decode('utf-8')})

class Metrics(APIView):
    
    def get(self, request):
        dt = request.query_params.get('dt')
        if dt is None:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        metrics = list(np.loadtxt(os.path.join(path, dt, 'metrics.txt')))
        return JsonResponse({'metrics': {
            'csi': metrics[:-3],
            'rmse': metrics[-3:]
        }})