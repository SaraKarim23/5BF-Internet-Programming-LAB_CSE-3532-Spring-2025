from django.urls import path
from app import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from .forms import LoginForm



urlpatterns = [
    path('', views.ProductView.as_view(), name='home'),
    path('product-detail/<int:pk>', views.ProductDetailView.as_view(), name='product-detail'),

    path('add-to-cart/', views.add_to_cart, name='add-to-cart'),
    path('cart/', views.show_cart, name='showcart'),

    path('pluscart/', views.plus_cart, name='pluscart'),
    path('minuscart/', views.minus_cart, name='minuscart'),
    path('removecart/', views.remove_cart, name='removecart'),


    
    # URL for Man Wear with optional subcategory
    path('man_wear/', views.man_wear, name='man_wear'),
    path('man_wear/<str:subcategory>/', views.man_wear, name='man_wear_subcategory'),  # Subcategory URL

    # URL for Women Wear with optional subcategory
    path('women_wear/', views.women_wear, name='women_wear'),
    path('women_wear/<str:subcategory>/', views.women_wear, name='women_wear_subcategory'),

    # URL for Baby Wear with optional subcategory
    path('baby_wear/', views.baby_wear, name='baby_wear'),
    path('baby_wear/<str:subcategory>/', views.baby_wear, name='baby_wear_subcategory'),

    # Other URLs (for product details, cart, etc.)
    path('product-detail/<int:id>/', views.product_detail, name='product_detail'),
    


    # path('chatbot/', views.chatbot_response, name='chatbot'),  # Removed: no such view
    path('chat/get_response/', views.get_chat_response, name='get_chat_response'),

    

    
    
    path('buy/', views.buy_now, name='buy-now'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('address/', views.address, name='address'),
    path('orders/', views.orders, name='orders'),
    path('changepassword/', views.change_password, name='changepassword'),
    
    path('mobile/', views.mobile, name='mobile'),
    path('mobile/<slug:data>', views.mobile, name='mobiledata'),

    path('checkout/', views.checkout, name='checkout'),
    path('paymentdone/', views.payment_done, name='paymentdone'),



    path('laptop/', views.laptop, name='laptop'),
    path('laptop/<slug:data>', views.laptop, name='laptopdata'),

    path('accounts/login/', auth_views.LoginView.as_view(template_name='app/login.html', authentication_form=LoginForm), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='login'),name='logout'),

    path('admin/login/', auth_views.LoginView.as_view(template_name='admin/login.html'), name='admin_login'),
    path('admin/logout/', auth_views.LogoutView.as_view(next_page='admin:login'), name='admin_logout'),

    path('registration/', views.CustomerRegistrationView.as_view(), name="customerregistration"),
    path('aboutus/', views.aboutus, name='aboutus')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)