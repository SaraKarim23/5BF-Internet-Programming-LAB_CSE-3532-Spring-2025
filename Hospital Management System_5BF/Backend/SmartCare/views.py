from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import HttpResponse
@api_view(['GET'])
def api_root(request):
    html = """
    <h1>API Root</h1>
    <ul>
        <li><a href="/appointment/">Appointment</a></li>
        <li><a href="/blog/">Blog</a></li>
        <li><a href="/contact_us/">Contact Us</a></li>
        <li><a href="/doctor/">Doctor</a></li>
        <li><a href="/patient/">Patient</a></li>
        <li><a href="/service/">Service</a></li>
    </ul>
    """
    return HttpResponse(html)
