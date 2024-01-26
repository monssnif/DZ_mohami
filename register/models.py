from django.db import models
from django.core.validators import RegexValidator, EmailValidator ,MinLengthValidator, MaxLengthValidator




class Lawyer(models.Model):
    first_name = models.CharField(max_length=20, default='', validators=[RegexValidator(regex='^[A-Za-z ]*$', message='Only letters are allowed.')])
    last_name = models.CharField(max_length=20, default='', validators=[RegexValidator(regex='^[A-Za-z ]*$', message='Only letters are allowed.')])
    email = models.EmailField(validators=[EmailValidator()])
    password = models.CharField(max_length=128,default='')
    phone_number = models.CharField(
        max_length=10,default='',
        validators=[
            RegexValidator(
                regex='^(05|06|07)[0-9]{8}$',
                message='Phone number must start with 05, 06, or 07 and be 10 digits long.'
            ),
            MinLengthValidator(limit_value=10),
            MaxLengthValidator(limit_value=10),
        ]
    )
    speciality = models.CharField(max_length=20, default='')
    location = models.CharField(max_length=20,default='')
    description=models.TextField(blank=True,null=True)
    image = models.ImageField(upload_to='images/',blank=True, null=True)
    
    
    
    
        
        
        
class User(models.Model):
    first_name = models.CharField(max_length=20, default='', validators=[RegexValidator(regex='^[A-Za-z ]*$', message='Only letters are allowed.')])
    last_name = models.CharField(max_length=20, default='', validators=[RegexValidator(regex='^[A-Za-z ]*$', message='Only letters are allowed.')])
    email = models.EmailField(unique=True, validators=[EmailValidator()])
    password = models.CharField(max_length=128, default='')
    is_active = models.BooleanField(default=True)
    
    
    
    

 
   
    
