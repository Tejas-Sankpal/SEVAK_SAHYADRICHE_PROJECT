from django.apps import AppConfig


class AdminDashConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'dashboard'

    # def ready(self):
    #     import dashboard.signals
