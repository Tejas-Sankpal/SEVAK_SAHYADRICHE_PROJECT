# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from django.contrib.auth.models import Permission
# from .models import Employee
#
#
# @receiver(post_save, sender=Employee)
# def assign_role_permission(sender, instance, created, **kwargs):
#     if created:
#         if instance.emp_role == 'admin':
#             perm= Permission.objects.all()
#             instance.user_permissions.set(perm)
#             print(f"{instance.emp_name} is Admin")
#
#         elif instance.emp_role == 'leader':
#             perm = Permission.objects.filter(codename= [''])
#             instance.user_permissions.set(perm)
#             print(f"{instance.emp_name} is Group Leader")
#
#         elif instance.emp_role == 'member':
#             perm = Permission.objects.filter(codename= ['admin_d'])
#             instance.user_permissions.set(perm)
#             print(f"{instance.emp_name} is Member")