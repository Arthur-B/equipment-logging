from django.db import models
from datetime import date, timedelta

# Create your models here.

class Deposition_RF(models.Model):
    
    MATERIAL_CHOICES = [
        ('SiO2', 'SiO2'),
        ('Si', 'Si')
    ]

    day = models.DateField('Date', default=date.today())
    user = models.CharField('User', max_length=20)
    material = models.CharField(
        'Material',
        max_length=10,
        choices=MATERIAL_CHOICES,
        default='SiO2')
    power = models.IntegerField('Power (W)', default=250, blank=True, null=True)
    pressure = models.FloatField('Pressure (mTorr)', default=0.84, blank=True, null=True)
    mfc_flow = models.FloatField('MFC flow (sccm)', default=10.0, blank=True, null=True)
    deposition_time = models.DurationField('Deposition time', default=timedelta(minutes=30), blank=True, null=True)
    thickness = models.FloatField('Thickness (nm)', blank=True, null=True)
    comment = models.CharField(' Comment', max_length=256)

    def __str__(self):
        return(str(self.day) + "_" + self.user + "_" + self.material)
