from django.forms import ModelForm
from .models import Deposition_RF
from datetime import date, timedelta

class SubmitDepositionRF(ModelForm):
    class Meta:
        model = Deposition_RF
        fields = '__all__'

class MakePredictionDepositionRF(ModelForm):
    class Meta:
        model = Deposition_RF
        fields = ['material', 'power', 'pressure', 'mfc_flow']