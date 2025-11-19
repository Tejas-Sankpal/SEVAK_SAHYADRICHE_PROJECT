from django.shortcuts import render, redirect, HttpResponse, get_object_or_404
from django.http import JsonResponse
from django.template.context_processors import request
from django.utils.timezone import now
from django.utils import timezone
from django.contrib import messages
from django.views.decorators.cache import never_cache
from django.core.mail import send_mail
from django.conf import settings
from .form import Volunteer
from .models import *
from django.views.decorators.csrf import csrf_exempt

# only showing pages only


def home(request):
    return render(request,"index.html")

def dashboard(request):
    total_members = Volunteer.objects.all().count()
    total_leaders = Volunteer.objects.filter(volunteer_role__role_name= 'Group Leader').count()
    total_tasks = Task_management.objects.count()
    total_groups = Groupcreate.objects.count()

    return render(request, "dashboard.html",
                  {
                      'total_members': total_members,
                      'total_leaders': total_leaders,
                      'total_tasks': total_tasks,
                      'total_groups': total_groups, }
                  )

@never_cache
def set_volunteer(request):
    vr_data= Volunteer.objects.all().order_by('-id')
    email = request.GET.get("email")
    exists = Volunteer.objects.filter(volunteer_email=email).exists()
    roles = Role_set.objects.all()
    return render(request, "set_volunteer.html",
                  {"vr_data":vr_data,
                           "exists": exists,
                           "roles": roles,
                           'timestamp': timezone.now().timestamp()})

def volunteer_update(request,id):
    data= Volunteer.objects.filter(id= id)
    roles = Role_set.objects.all()
    return render(request,"update_volunteer.html",{"data":data, "roles":roles})

def group_dashboard(request):
    group_data = Groupcreate.objects.all().order_by('-id')
    return render(request,"Group_dashboard.html",{'group': group_data})

def create_group(request):
    volunteer_data= Volunteer.objects.filter(volunteer_role__role_name="Group Leader")
    group_data= Groupcreate.objects.all().order_by('-id')
    return render(request,"create_group.html", {'volunteer':volunteer_data, 'group': group_data})

def group_see(request):
    group_data = Groupcreate.objects.all().order_by('-id')
    group_leaders = Volunteer.objects.filter(volunteer_role__role_name="Group Leader")
    return render(request,"group_see.html",{'group': group_data,"group_leaders": group_leaders} )

def add_members_view(request, group_id):
    group = get_object_or_404(Groupcreate, pk=group_id)   #"get_object_or_404" means if data not come then showing error like 404
    all_volunteers = Volunteer.objects.filter(volunteer_role__role_name='Member')

    volunteers_data = []
    for volunteer in all_volunteers:  #fetch all volunteers
        membership = Volunteers_group.objects.filter(volunteer=volunteer).first()
        if membership:  #check the membership of group if available then print current_group_name & current_leader_name
            is_in_group = True
            current_group_name = membership.groupcreate.group_name
            current_leader_name = membership.groupcreate.leader.volunteer_name
        else:                       #if not then print -
            is_in_group = False
            current_group_name = "-"
            current_leader_name = "-"

        volunteers_data.append({
            'volunteer_obj': volunteer,
            'is_in_group': is_in_group,
            'current_group': current_group_name,
            'current_leader': current_leader_name,
        })
        # print(volunteers_data)
    context = {
        'group': group,
        'volunteers': volunteers_data,
    }
    return render(request, 'add_members.html', context)

def view_members(request):

    all_volunteers = Volunteer.objects.filter(volunteer_role__role_name='Member')

    volunteers_data = []
    for volunteer in all_volunteers:         #fetch all volunteers
        membership = Volunteers_group.objects.filter(volunteer=volunteer).first()
        if membership:         #check the membership of group if available then print current_group_name & current_leader_name
            is_in_group = True
            current_group_name = membership.groupcreate.group_name
            current_leader_name = membership.groupcreate.leader.volunteer_name
        else:
            is_in_group = False
            current_group_name = "-"
            current_leader_name = "-"

        volunteers_data.append({
            'volunteer_obj': volunteer,
            'is_in_group': is_in_group,
            'current_group': current_group_name,
            'current_leader': current_leader_name,
        })

    context = {
        'volunteers': volunteers_data,
    }
    return render(request,"see_members_with_group.html", context)

def task_dashboard(request):
    return render(request,"task_dashboard.html")

def create_task(request):
    leader_name = Volunteer.objects.filter(volunteer_role__role_name="Group Leader")
    group_name = Groupcreate.objects.all()
    admin_name = Volunteer.objects.filter(volunteer_role__role_name="Admin")

    context = {
        "leader_name": leader_name,
        "group_name": group_name,
        "admin_name": admin_name
    }
    return render(request, "create_task.html", context)

def get_leader_by_group(request, group_id):
    try:
        group = Groupcreate.objects.get(id=group_id)
        data = {
            'leader_id': group.leader.id,
            'leader_name': group.leader.volunteer_name
        }
        return JsonResponse(data)
    except Groupcreate.DoesNotExist:
        return JsonResponse({'error': 'Group not found'}, status=404)

def get_group_by_leader(request, leader_id):
    try:
        group = Groupcreate.objects.get(leader__id=leader_id)
        data = {
            'group_id': group.id,
            'group_name': group.group_name
        }
        return JsonResponse(data)
    except Groupcreate.DoesNotExist:
        return JsonResponse({'error': 'Group not found for this leader'}, status=404)

def see_assigned_task(request):
    task_details= Task_management.objects.all()
    return render(request,"see_assigned_task.html", {"task_details":task_details})

def task_update(request, task_id):
    leader_name = Volunteer.objects.filter(volunteer_role__role_name="Group Leader")
    group_name = Groupcreate.objects.all()
    data = Task_management.objects.filter(id= task_id)

    context = {
        "leader_name": leader_name,
        "group_name": group_name,
        "data": data
    }
    return render(request, "task_update.html", context)

def set_role(request):
    return render(request,"set_role.html")

def see_role(request):
    roles= Role_set.objects.all().order_by('-id')
    return render(request,"see_role.html",{"roles": roles})

def update_Role(request, role_id):
    roles = Role_set.objects.filter(id= role_id)
    return render(request,"update_role.html",{"roles": roles})

def notification(request):
    return render(request, "notification.html")

def see_notification(request):
    notification_data= Notification.objects.all().order_by('-id')
    return render(request,"see_notification.html",{"notify_data":notification_data})







# write logic functions only

def volunteer_save(request):
    if request.method == "POST":
        vname = request.POST["vname"]
        vemail = request.POST["vemail"]
        vcon = request.POST["vcon"]
        vpass = request.POST["vpass"]
        vrole = request.POST["vrole"]

        #if email already exist then showing error
        if Volunteer.objects.filter(volunteer_email=vemail).exists():
            messages.error(request, f"'{vemail}' this email already exists!")
            return redirect("/set_volunteer")

        #if contact number already exists then showing error
        if Volunteer.objects.filter(volunteer_contact= vcon).exists():
            messages.error(request, f"'{vcon}' this contact number already exists!")
            return redirect("/set_volunteer")

        role_obj = Role_set.objects.get(id= vrole)

        vol_dt= Volunteer( volunteer_name= vname,  volunteer_email= vemail,  volunteer_contact= vcon,  volunteer_pass= vpass,  volunteer_role= role_obj)
        vol_dt.save()
        messages.success(request,"New Volunteer is added Successfully!")

        #Gmail sends
        # subject = "Welcome to the Company!"
        # message = f"""
        #         Dear Mr./Ms. {vname},
        #
        #         Congratulations! You have been successfully added to our company volunteers database
        #         as a {vrole} and your dashboard password is {vpass}.
        #
        #         We are excited to have you on board!
        #
        #         Regards,
        #         Admin Team
        #         """
        # send_mail(
        #     subject,
        #     message,
        #     settings.EMAIL_HOST_USER,  # sender
        #     [vemail],  # receiver
        #     fail_silently=False,
        # )
        # messages.success(request,"Email has been sent to new volunteer!")
        return redirect("/set_volunteer")
    else:
        messages.error(request,"Something wrong!")
        return redirect("/set_volunteer")

def volunteer_delete(request,id):
    Volunteer.objects.filter(id= id).delete()
    return redirect("/set_volunteer")

def save_updated_volunteer(request):
    if request.method == "POST":
        vid= request.POST["vid"]
        vname = request.POST["vname"]
        vemail = request.POST["vemail"]
        vcon = request.POST["vcon"]
        vpass = request.POST["vpass"]
        vrole = request.POST["vrole"]

        volunteer = Volunteer.objects.get(id=vid)
        role_obj = Role_set.objects.get(role_name=vrole)

        # used to block changing the role leader -> any other role
        if Groupcreate.objects.filter(leader=volunteer).exists():

            # check if role actually changed
            if volunteer.volunteer_role.id != role_obj.id:
                messages.error(request,  "Role update blocked — this volunteer is currently assigned as a Group Leader. "
                                                 "Please reassign the group or delete it before changing the role.")
                return redirect("volunteer_update", id=vid)

        if Volunteer.objects.filter(volunteer_contact= vcon).exclude(id= vid).exists():
            messages.error(request,"This contact is already exists !")
            return redirect("volunteer_update", id= vid)

        Volunteer.objects.filter(id= vid).update(
            volunteer_name= vname,
            volunteer_email= vemail,
            volunteer_contact= vcon,
            volunteer_pass= vpass,
            volunteer_role= role_obj,
            volunteer_update_regi_datetime= now()
        )

        # Gmail sends
        # subject = "Hey Alert Some has been changed!"
        # message = f"""
        #                 Dear Mr./Ms. {vname},
        #
        #                 please check your account because your some data has been change by authority.
        #
        #                 Regards,
        #                 Admin Team
        #                 """
        # send_mail(
        #     subject,
        #     message,
        #     settings.EMAIL_HOST_USER,  # sender
        #     [vemail],  # receiver
        #     fail_silently=False,
        # )
        messages.success(request,f"Data has been updated of {vname}!")
        return redirect("set_volunteer")
    else:
        messages.error(request, "Something wrong!")
        return redirect("volunteer_update")

def add_new_group(request):
    if request.method == "POST":
        group_nm= request.POST["group_nm"]
        vid= request.POST["vid"]

        vid_obj = Volunteer.objects.get(id=vid)

        #if group already exist then showing error
        if Groupcreate.objects.filter(group_name= group_nm).exists():
            messages.error(request, f"'{group_nm}' this group already exists!")
            return redirect("/create_group")

        #if leader already assign then showing error
        if Groupcreate.objects.filter(leader= vid_obj).exists():
            messages.error(request,f"'{vid_obj}' this leader already assign to another group!")
            return redirect("/create_group")

        add_new= Groupcreate(group_name= group_nm, leader= vid_obj)
        add_new.save()

        # Send Email to leader after assign group
        # subject = f"You are assigned as Leader of {group_nm}"
        # message = f"""
        #                Dear {vid_obj.volunteer_name},
        #
        #                Congratulations! 🎉
        #                You are now the Leader of group "{group_nm}".
        #
        #                Regards,
        #                Admin Team
        #                """
        # send_mail(
        #     subject,
        #     message,
        #     settings.EMAIL_HOST_USER,
        #     [vid_obj.volunteer_email],
        #     fail_silently=False
        # )
        messages.success(request,"New group is created!")
        return redirect("/group_see")
    else:
        messages.error(request,"Something wrong!")
        return redirect("/create_group")

def group_delete(request, id):
    group= Groupcreate.objects.filter(id= id)
    group.delete()
    return redirect("/group_see")

def update_group(request):
    if request.method == "POST":
        g_id= request.POST["id"]
        g_name = request.POST["group_nm"]
        g_leader = request.POST["vid"]

        #fetch the old group leader object to compare new and old group leader
        group_obj = Groupcreate.objects.get(id=g_id)
        old_leader = group_obj.leader

        leader_obj = Volunteer.objects.get(id=g_leader)

        Groupcreate.objects.filter(id = g_id).update(group_name= g_name, leader= leader_obj)
        # if old_leader.id != leader_obj.id:
            # subject="You are assigned as new Group Leader"
            # message = f"""
            #                 Dear Mr./Ms. {leader_obj.volunteer_name},
            #
            #                 You have been assigned as the new leader of group '{g_name}'.
            #
            #                 Congratulations!
            #
            #                 Regards,
            #                 Admin Team
            #             """
            # send_mail(
            #     subject,
            #     message,
            #     settings.EMAIL_HOST_USER,  # sender
            #     [leader_obj.volunteer_email],  # receiver
            #     fail_silently=False,
            # )
        messages.success(request,"Group data updated successfully!")
        return redirect("/group_see")
    else:
        messages.error(request,"Something wrong!")
        return redirect("/group_see")

def assign_volunteer_to_group(request, group_id, volunteer_id):
    if request.method == 'POST':
        group = get_object_or_404(Groupcreate, pk=group_id)
        volunteer = get_object_or_404(Volunteer, pk=volunteer_id)

        #if available members inside the particular group then sent mail
        if not Volunteers_group.objects.filter(volunteer=volunteer).exists():
            Volunteers_group.objects.create(groupcreate=group, volunteer=volunteer, group_role='Member')
            messages.success(request, f"{volunteer.volunteer_name} added to {group.group_name} !.")

            #send mail to each volunteer to know who is our group leader and name of group
            # leader = group.leader
            # subject = f"You have been added to group {group.group_name}"
            # message = f"""
            #             Dear {volunteer.volunteer_name},
            #
            #             You have been successfully added to the group "{group.group_name}".
            #             Your group leader is {leader.volunteer_name} ({leader.volunteer_email}).
            #
            #             Regards,
            #             Admin Team
            #             """
            # send_mail(
            #     subject,
            #     message,
            #     settings.EMAIL_HOST_USER,
            #     [volunteer.volunteer_email],
            #     fail_silently=False
            # )
            messages.success(request, f" Mail Sent Successfully to {volunteer.volunteer_name} !.")
        else:
            messages.error(request, f"{volunteer.volunteer_name} is already in a group.")

    return redirect('add_members', group_id=group_id)

def remove_volunteer_from_group(request, group_id, volunteer_id):
    member = Volunteers_group.objects.get(groupcreate_id=group_id, volunteer_id=volunteer_id)
    member.delete()
    messages.success(request, "Volunteer removed successfully!")
    return redirect("add_members", group_id=group_id)

#send email to leader list of members
def send_group_list_leader(request, group_id):
    group = get_object_or_404(Groupcreate, pk=group_id)
    leader = group.leader
    members = Volunteers_group.objects.filter(groupcreate=group).select_related("volunteer")

    if members.exists():  # when mail send if volunteer/ member are available inside the group

        members_list = "\n".join([
            f"{m.volunteer.volunteer_name} - {m.volunteer.volunteer_email}"
            for m in members
        ])
        # print(members_list)
        # subject_leader = f"Members of your group {group.group_name}"
        # message_leader = f"""
        #     Dear {leader.volunteer_name},
        #
        #     Here is the list of your group members:
        #
        #     {members_list}
        #
        #     Regards,
        #     Admin Team
        #     """
        # send_mail(
        #     subject_leader,
        #     message_leader,
        #     settings.EMAIL_HOST_USER,
        #     [leader.volunteer_email],
        #     fail_silently=False
        # )

        messages.success(request, f"Email sent to leader {leader.volunteer_name} with members list!")
    else:
        messages.warning(request, f"No members found in {group.group_name}, so no email was sent.")

    return redirect("add_members", group_id=group_id)

def assign_task_to_leader(request):
    if request.method == "POST":
        t_title= request.POST["task_title"]
        t_desc = request.POST["task_description"]
        t_group_id = request.POST["group_id"]
        t_status = request.POST["task_status"]


        group_obj= Groupcreate.objects.get(id= t_group_id)

        #this prevents the duplication of task
        if Task_management.objects.filter(task_title=t_title).exists():
            messages.error(request,"This task already assign to leader !")
            return redirect("create_task")

        task= Task_management(task_title=t_title, task_description=t_desc, Group=group_obj, task_status=t_status )
        task.save()

        messages.success(request,"Assign new task to leader successfully !!!!")
        return redirect("see_assigned_task")
    else:
        messages.error(request, "Something wrong !")
        return redirect("create_task")

def task_delete(request, task_id):
    task= Task_management.objects.filter(id=task_id)
    task.delete()
    return redirect("see_assigned_task")


def update_assign_task_to_leader(request):
    if request.method == "POST":

        task_id = request.POST["tid"]
        task_title = request.POST["task_title"]
        task_desc = request.POST["task_description"]
        assign_group_id = request.POST["group_id"]

        # get objects
        group_obj = Groupcreate.objects.get(id=assign_group_id)
        # task = Task_management.objects.get(id=task_id)

        # unique title check
        if Task_management.objects.filter(task_title=task_title).exclude(id=task_id).exists():
            messages.error(request, "Task already exists!")
            return redirect("task_update", task_id=task_id)

        # update task

        # 1st method
        # task.task_title = task_title
        # task.task_description = task_desc
        # task.Group = group_obj
        # task.save()

        # 2nd method
        Task_management.objects.filter(id= task_id).update(
            task_title= task_title,
            task_description= task_desc,
            Group= group_obj
        )

        messages.success(request, "Task updated!")
        return redirect("see_assigned_task")

    messages.error(request, "Something went wrong!")
    return redirect("task_update", task_id=task_id)


def save_role(request):
    if request.method == "POST":
        rolenm= request.POST["rolenm"]

        if Role_set.objects.filter(role_name= rolenm).exists():
            messages.error(request, "This role already created !")
            return redirect("set_role")

        role= Role_set(role_name= rolenm)
        role.save()

        messages.success(request,"New role is set !!!")
        return redirect("set_role")
    else:
        messages.error(request, "Something worng !!!")
        return redirect("set_role")

def save_updated_role(request):
    if request.method == "POST":
        roleid= request.POST["rid"]
        rolenm= request.POST["rolenm"]

        if Role_set.objects.filter(role_name= rolenm).exists():
            messages.error(request, "This role already created !")
            return redirect("update_Role")

        Role_set.objects.filter(id=roleid).update(role_name= rolenm)

        messages.success(request,"Role is updated !!!")
        return redirect("see_role")
    else:
        messages.error(request, "Something worng !!!")
        return redirect("update_Role")

def delete_role(request, role_id):
    role= Role_set.objects.filter(id= role_id)
    role.delete()
    return redirect("see_role")

def send_notification(request):
    if request.method == "POST":
        notify_type= request.POST["notifytype"]
        notify_title= request.POST["notifytitle"]
        notify_desc= request.POST["notifydesc"]
        meeting_link= request.POST["meetinglink"]

        notify= Notification(notify_type= notify_type, title= notify_title, message= notify_desc, link= meeting_link)
        notify.save()

        #collect email
        volunteer_emails = list(Volunteer.objects.values_list('volunteer_email', flat=True))

        if notify.notify_type == "Casual":
            subject= "Message from Admin !!"
            message= f"{notify.title}\n\n{notify.message}"

        else:
            subject = "Meeting Scheduled !!"
            message= f"{notify.title}\n\n{notify.message}\n\nMeeting Link: {notify.link}"

        send_mail(
             subject,
             message,
             'sankpaltejas400@gmail.com',
             volunteer_emails,
             fail_silently=False
         )

        messages.success(request,"Notification Sent !")
        return redirect("notification")

# LOAD NOTIFICATIONS (AJAX)
def load_notifications(request):
    notification= Notification.objects.order_by('-notify_created_at')

    data= []
    for n in notification:
        data.append(
            {
                "id": n.id,
                "title": n.title,
                "message": n.message,
                "createdAt": n.notify_created_at.isoformat(),
                "read": n.is_read
            }
        )
    return JsonResponse({"notifications": data})

@csrf_exempt
def mark_notification_read(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            notif_id = data.get("id")

            notif = Notification.objects.get(id=notif_id)
            notif.is_read = True
            notif.save()

            return JsonResponse({"success": True})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "POST method required"}, status=405)

def logout(request):
    return redirect("/")
