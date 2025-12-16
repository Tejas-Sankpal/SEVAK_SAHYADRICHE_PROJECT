from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    # only view page urls
    path('', views.home, name='dashboard'),
    path('set_volunteer/', views.set_volunteer, name='set_volunteer'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('volunteer_update/<int:id>/', views.volunteer_update, name='volunteer_update'),
    path('create_group/', views.create_group, name='create_group'),
    path('group_see/', views.group_see, name='group_see'),
    path('group_see/<int:group_id>/add-members/', views.add_members_view, name='add_members'),
    path('see_members_with_group/', views.view_members, name='view_members'),
    path('get_leader_by_group/<int:group_id>/', views.get_leader_by_group, name='get_leader_by_group'),
    path('get_group_by_leader/<int:leader_id>/', views.get_group_by_leader, name='get_group_by_leader'),
    path('create_task/', views.create_task, name='create_task'),
    path('see_assigned_task', views.see_assigned_task, name='see_assigned_task'),
    path('task_update/<int:task_id>/', views.task_update, name='task_update'),
    path('set_role/', views.set_role, name= 'set_role'),
    path('see_role/', views.see_role, name='see_role'),
    path('update_Role/<int:role_id>/', views.update_Role, name='update_Role'),
    path('notification/', views.notification, name= 'notification'),
    path('see_notification/', views.see_notification, name= 'see_notification'),
    path('update_profile/', views.update_profile, name='update_profile'),
    path('see_task_details/<int:task_id>/', views.see_task_details, name= 'see_task_details'),
    path('view_search_tasks/', views.view_search_tasks, name='view_search_tasks'),
    path('task_search_result/', views.task_search_result, name='task_search_result'),
    path("see_volunteers/", views.see_volunteers, name="see_volunteers"),
    path("volunteer_search_result/", views.volunteer_search_result, name="volunteer_search_result"),
    path('see_member_details/<int:mem_id>/', views.see_member_details, name='see_member_details'),
    path('see_subtask_details/<int:member_id>/', views.see_subtask_details, name= 'see_subtask_details'),
    path('update_subtask/<int:member_id>/', views.update_subtask, name= 'update_subtask'),
    path('subtask_search_result/', views.subtask_search_result, name='subtask_search_result'),






    # logic urls
    path('volunteer_save/', views.volunteer_save, name='volunteer_save'),
    path('volunteer_delete/<int:id>/', views.volunteer_delete, name='volunteer_delete'),
    path('save_updated_volunteer/', views.save_updated_volunteer, name='save_updated_volunteer'),
    path('add_new_group/', views.add_new_group, name='add_new_group'),
    path('group_delete/<int:id>/', views.group_delete, name='group_delete'),
    path('update_group/', views.update_group, name='update_group'),
    path('group_see/<int:group_id>/assign/<int:volunteer_id>/', views.assign_volunteer_to_group, name='assign_volunteer'),
    path('group_see/<int:group_id>/remove/<int:volunteer_id>/', views.remove_volunteer_from_group, name='remove_volunteer'),
    path('group_see/<int:group_id>/assign/send_group_list_leader/', views.send_group_list_leader, name='send_group_list_leader'),
    path('assign_task_to_leader/', views.assign_task_to_leader, name='assign_task_to_leader'),
    path('task_delete/<int:task_id>/', views.task_delete, name='task_delete'),
    path('update_assign_task_to_leader/', views.update_assign_task_to_leader, name='update_assign_task_to_leader'),
    path('save_role/', views.save_role, name='save_role'),
    path('save_updated_role/', views.save_updated_role, name='save_updated_role'),
    path('delete_role/<int:role_id>/', views.delete_role, name= 'delete_role'),
    path('send_notification', views.send_notification, name= 'send_notification'),
    path('notifications/load/', views.load_notifications, name= 'load_notifications'),
    path('notifications/read/', views.mark_notification_read, name= 'mark_notification_read'),
    path('update_task_status/', views.update_task_status, name= 'update_task_status'),
    path('assign_task_to_members/', views.assign_task_to_members, name= 'assign_task_to_members'),
    path('update_subtask_status/', views.update_subtask_status, name= 'update_subtask_status'),
    path('update_assign_subtask_to_member/', views.update_assign_subtask_to_member, name='update_assign_subtask_to_member'),
    path('logout/', views.logout, name='logout'),
    path('delete_subtask/<int:member_id>/', views.delete_subtask, name= 'delete_subtask'),
]
