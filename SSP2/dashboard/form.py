from django.forms import ModelForm

from .models import Volunteer

class Volunteer(ModelForm):
    class Meta:
        model= Volunteer
        fields= '__all__'