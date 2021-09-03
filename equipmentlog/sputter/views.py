# from django.shortcuts import render

# Create your views here.

from django.shortcuts import render, redirect
import pandas as pd
from plotly.offline import plot
import plotly.graph_objects as go
from rest_framework.serializers import Serializer

from .models import Deposition_RF
from .forms import SubmitDepositionRF, MakePredictionDepositionRF

from rest_framework import generics
from .serializers import DepositionSerializer

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

class DepositionListCreate(generics.ListCreateAPIView):
    queryset = Deposition_RF.objects.order_by('-id')[:10] # Get the last 10 entered
    serializer_class = DepositionSerializer

@api_view(['GET', 'POST'])
def deposition_list(request):
    if request.method == 'GET':
        data = Deposition_RF.objects.all()
        serializer = DepositionSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = DepositionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        print(serializer.data) # Print data if we reach bad request
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def deposition_detail(request, id):
    try:
        deposition = Deposition_RF.objects.get(id=id) # WRITE PROPER CONDITION TO GET
    except Deposition_RF.DoesNotExist:
        print(id)
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        serializer = DepositionSerializer(deposition, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    
    elif request.method == 'DELETE':
        deposition.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



def index(request):
    
    # Latest depostions

    latest_depositions = Deposition_RF.objects.order_by('-day')[:10]

    # Form to make a prediction

    plot_div = None

    if request.method == 'POST' and "predict" in request.POST:
        form_prediction = MakePredictionDepositionRF(request.POST)
        if form_prediction.is_valid():

            # Get the filtered data

            prediction_data = Deposition_RF.objects.filter(material=request.POST.get("material"),
                                                           power=request.POST.get("power"),
                                                           pressure=request.POST.get("pressure"),
                                                           mfc_flow=request.POST.get("mfc_flow"))
            df = pd.DataFrame({"Deposition time": prediction_data.values_list('deposition_time', flat=True),
                               "Thickness (nm)": prediction_data.values_list('thickness', flat=True)})
            df = df.sort_values(by="Deposition time") # Order the data for plot

            # Make the plot
            # List of graph objects for figure.
            # Each object will contain on series of data.
            graphs = []

            # Adding linear plot of y1 vs. x.
            graphs.append(
                go.Scatter(x=df["Deposition time"], y=df["Thickness (nm)"], mode='markers', name='Line y1')
            )

            # Adding scatter plot of y2 vs. x. 
            # Size of markers defined by y2 value.
            # graphs.append(
            #     go.Scatter(x=x, y=y2, mode='markers', opacity=0.8, 
            #             marker_size=y2, name='Scatter y2')
            # )

            # Adding bar plot of y3 vs x.
            # graphs.append(
            #     go.Bar(x=x, y=y3, name='Bar y3')
            # )

            # Setting layout of the figure.
            layout = {
                'xaxis_title': 'Deposition time',
                'yaxis_title': 'Thickness (nm)',
                'height': 420,
                'width': 560,
                'xaxis_tickformat': "S"
            }

            # Getting HTML needed to render the plot.
            plot_div = plot({'data': graphs, 'layout': layout}, 
                            output_type='div')

    
    else:
        form_prediction = MakePredictionDepositionRF()

    # Form to add new depositions

    if request.method == 'POST' and "submit" in request.POST:
        form_submission = SubmitDepositionRF(request.POST)
        if form_submission.is_valid():
            form_submission.save()

            # return redirect('sputter.html')
    
    else:
        form_submission = SubmitDepositionRF()

    # Final context

    context = {'latest_depositions': latest_depositions,
               'plot_div': plot_div,
               'form_prediction': form_prediction,
               'form_submission': form_submission}
        
    return render(request, 'sputter/index.html', context)
    