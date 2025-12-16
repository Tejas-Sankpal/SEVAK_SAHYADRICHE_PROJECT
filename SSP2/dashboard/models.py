from django.db import models
from django.utils import timezone

# 1st model
class Role_set(models.Model):
    role_name= models.CharField(max_length=100, default= "0")
    role_regi_datetime = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.role_name

# 2nd model
class Volunteer(models.Model):
    volunteer_name= models.CharField(max_length=100, default="0")
    volunteer_email= models.CharField(max_length=100, default="0", unique= True)
    volunteer_contact= models.CharField(max_length=10, default='0')
    volunteer_pass= models.CharField(max_length=100, default="0")
    volunteer_role= models.ForeignKey(
        Role_set,
        on_delete= models.CASCADE,
        related_name= 'role_of_volunteer'
    )
    profile_photo = models.ImageField(upload_to='uploads/', null=True, blank=True)
    volunteer_birthday = models.DateField(null=True, blank=True)
    volunteer_address = models.TextField(null=True, blank=True)
    volunteer_regi_datetime= models.DateField(auto_now_add= True)  #set at create time
    volunteer_update_regi_datetime= models.DateTimeField(auto_now= True) #set at every time update

    def __str__(self):
        return self.volunteer_name

# 3rd model
class Groupcreate(models.Model):
    group_name= models.CharField(max_length= 100, default='0', unique= True)
    leader= models.ForeignKey(
        Volunteer,
        on_delete= models.CASCADE,
        related_name= 'leaders_of_group'
    )
    group_regi_date = models.DateField(auto_now_add=True)  # set at create time
    group_update_regi_date = models.DateTimeField(auto_now=True)  # set at every time update

# 4th model
class Volunteers_group(models.Model):
    group_role= models.CharField(max_length=100, choices=[("Member", "Member")])
    groupcreate= models.ForeignKey(
        Groupcreate,
        on_delete= models.CASCADE,
        related_name='volunteers_group_name'
    )
    volunteer= models.ForeignKey(
        Volunteer,
        on_delete= models.CASCADE,
        related_name= 'name_of_volunteer',
        limit_choices_to= {'volunteer_role':'Member'}
    )



# 5th model of task for leader from admin
class Task_management(models.Model):
    task_title= models.CharField(max_length= 100, default= "0")
    task_description= models.TextField(default="0")
    Group= models.ForeignKey(
        Groupcreate,
        on_delete= models.CASCADE,
        related_name= 'name_of_group'
    )
    task_created_at= models.DateField(auto_now_add= True)
    task_status= models.CharField(max_length= 100,
                                  choices=[("Pending","Pending"), ("In Progress", "In Progress"), ("Complete", "Complete"), ("Rejected", "Rejected")],
                                  default= "Pending")
    task_reject_reason = models.TextField(default="N/A", blank=True, null=True)

#6th model for notification
class Notification(models.Model):
    Notification_Type=[
        ("Casual", "Casual Message"),
        ("Meeting", "Meeting Link"),
    ]

    notify_type= models.CharField(max_length=100, choices= Notification_Type, default= "Casual")
    title= models.CharField(max_length=500)
    message= models.TextField()
    link= models.URLField(blank= True, default="N/A")
    notify_created_at= models.DateTimeField(auto_now_add= True)
    is_read= models.BooleanField(default=False)

#7th model for create subtask
class Sub_task_managemnet(models.Model):
    task_id= models.ForeignKey(
        Task_management,
        on_delete= models.CASCADE,
        related_name= 'sub_task_title'
    )
    subtask_description= models.TextField(default= '0')
    assigned_subtask_to = models.ForeignKey(
        Volunteers_group,
        on_delete=models.CASCADE,
        related_name='name_of_volunteer',
        limit_choices_to={'volunteer_role': 'Member'}
    )
    subtask_status= models.CharField(max_length= 100,
                                  choices=[("Pending","Pending"), ("In Progress", "In Progress"), ("Complete", "Complete"), ("Rejected", "Rejected")],
                                  default= "Pending")
    subtask_created_at= models.DateField(auto_now_add= True)
    subtask_updated_at= models.DateField(auto_now= True)

