from django.shortcuts import render, redirect
from django.views import View
from .models import Customer, Product, Cart, OrderPlaced
from .forms import CustomerRegistrationForm, CustomerProfileForm
from django.contrib import messages
from django.db.models import Q
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import os
import openai


#def home(request):
# return render(request, 'app/home.html')



class ProductView(View):
 def get(self, request):
  topwears = Product.objects.filter(category='TW')
  bottomwears = Product.objects.filter(category='BW')
  mobiles = Product.objects.filter(category='M')
  laptops = Product.objects.filter(category='L')
  man_wears = Product.objects.filter(category='MW')  # MW = Man Wear
  women_wears = Product.objects.filter(category='WW')  # WW = Women Wear
  baby_wears = Product.objects.filter(category='BW')  # BW = Baby Wear
  return render(request,'app/home.html',{'topwears':topwears, 'bottomwears': bottomwears,  'mobiles':mobiles, 'laptops': laptops,'man_wears': man_wears,'women_wears': women_wears,'baby_wears': baby_wears,})
  

#def product_detail(request):
 #return render(request, 'app/productdetail.html')

class ProductDetailView(View):
 def get(self, request, pk):
  product = Product.objects.get(pk=pk)
  return render(request, 'app/productdetail.html',{'product' : product})

def add_to_cart(request):
 user = request.user
 product_id = request.GET.get('prod_id')
 product = Product.objects.get(id = product_id)
 Cart(user=user,product=product).save()

 return redirect('/cart')

def show_cart(request):
 if request.user.is_authenticated:
  user = request.user
  cart = Cart.objects.filter(user=user)
  #print(cart)
  amount = 0.0
  shipping_amount = 80.0
  total_amount= 0.0
  cart_product = [p for p in Cart.objects.all() if p.user == user]
  #print(cart_product)
  if cart_product:
    amount = 0.0
    for p in cart_product:
        tempamount = p.quantity * p.product.discounted_price
        amount += tempamount
    totalamount = amount + shipping_amount
    return render(request, 'app/addtocart.html', {'carts': cart, 'totalamount': totalamount, 'amount': amount})
  else:
    return render(request, 'app/emptycart.html')


def plus_cart(request):
 if request.method == 'GET':
  prod_id = request.GET['prod_id']
  c= Cart.objects.get(Q(product=prod_id) & Q(user=request.user))
  c.quantity+=1
  c.save()
  amount = 0.0
  shipping_amount = 80.0
  cart_product = [p for p in Cart.objects.all() if p.user == request.user]
  for p in cart_product:
    tempamount = p.quantity * p.product.discounted_price
    amount += tempamount
    totalamount = amount + shipping_amount
  data={
    'quantity': c.quantity,
    'amount': amount,
    'totalamount' : totalamount,
  }
  return JsonResponse(data)



def minus_cart(request):
 if request.method == 'GET':
  prod_id = request.GET['prod_id']
  c= Cart.objects.get(Q(product=prod_id) & Q(user=request.user))
  c.quantity-=1
  c.save()
  amount = 0.0
  shipping_amount = 80.0
  cart_product = [p for p in Cart.objects.all() if p.user == request.user]
  for p in cart_product:
    tempamount = p.quantity * p.product.discounted_price
    amount += tempamount
    totalamount = amount + shipping_amount
  data={
    'quantity': c.quantity,
    'amount': amount,
    'totalamount' : totalamount,
  }
  return JsonResponse(data)
    


def remove_cart(request):
 if request.method == 'GET':
  prod_id = request.GET['prod_id']
  c= Cart.objects.get(Q(product=prod_id) & Q(user=request.user))
 
  c.delete()
  amount = 0.0
  shipping_amount = 80.0
  cart_product = [p for p in Cart.objects.all() if p.user == request.user]
  for p in cart_product:
    tempamount = p.quantity * p.product.discounted_price
    amount += tempamount
    totalamount = amount + shipping_amount
  data={
    'amount': amount,
    'totalamount' : totalamount,
  }
  return JsonResponse(data)



def buy_now(request):
 return render(request, 'app/buynow.html')

#def profile(request):
 #return render(request, 'app/profile.html')

def address(request):
 add = Customer.objects.filter(user=request.user)
 return render(request, 'app/address.html', {'add' : add ,  'active':'btn-primary'})

def orders(request):
 op = OrderPlaced.objects.filter(user=request.user)
 return render(request, 'app/orders.html', {'order_placed': op})

def change_password(request):
 return render(request, 'app/changepassword.html')

def mobile(request, data= None):
 if data == None:
  mobiles = Product.objects.filter(category='M')
 elif data == 'Apple' or data == 'Redmi':
  mobiles = Product.objects.filter(category='M').filter(brand=data)
 return render(request, 'app/mobile.html', {'mobiles' : mobiles})

def laptop(request, data= None):
 if data == None:
  laptops = Product.objects.filter(category='L')
 elif data == 'Apple' or data == 'Dell':
  laptops = Product.objects.filter(category='L').filter(brand=data)
 return render(request, 'app/laptop.html', {'laptops' : laptops})






def man_wear(request, subcategory=None):
    if subcategory is None:
        products = Product.objects.filter(category='MW')  # 'MW' for Man Wear
    else:
        products = Product.objects.filter(category='MW', subcategory=subcategory)  # Filter by subcategory
    return render(request, 'app/man_wear.html', {'products': products, 'subcategory': subcategory})

def women_wear(request, subcategory=None):
    if subcategory is None:
        products = Product.objects.filter(category='WW')  # 'WW' for Women Wear
    else:
        products = Product.objects.filter(category='WW', subcategory=subcategory)  # Filter by subcategory
    return render(request, 'app/women_wear.html', {'products': products, 'subcategory': subcategory})

def baby_wear(request, subcategory=None):
    if subcategory is None:
        products = Product.objects.filter(category='BW')  # 'BW' for Baby Wear
    else:
        products = Product.objects.filter(category='BW', subcategory=subcategory)  # Filter by subcategory
    return render(request, 'app/baby_wear.html', {'products': products, 'subcategory': subcategory})



def product_detail(request, id):
    try:
        # Fetch the product using the product ID passed in the URL
        product = Product.objects.get(id=id)
    except Product.DoesNotExist:
        # In case the product does not exist, you can show a custom 404 or a message
        return render(request, 'app/product_not_found.html')

    # Pass the product to the template for rendering
    return render(request, 'app/productdetail.html', {'product': product})





#def login(request):
 #return render(request, 'app/login.html')

#def customerregistration(request):
 #return render(request, 'app/customerregistration.html')

class CustomerRegistrationView(View):
 def get(self,request):
  form = CustomerRegistrationForm()
  return render(request,'app/customerregistration.html',{'form':form})
 
 def post(self, request):
  form  = CustomerRegistrationForm(request.POST)
  if form.is_valid():
    messages.success(request, 'Congratulations!! Registeres Successfully')
    form.save()
  return render(request,'app/customerregistration.html',{'form':form})



def checkout(request):
 user = request.user
 add = Customer.objects.filter(user=user)
 cart_items = Cart.objects.filter(user=user)
 amount = 0.0
 shipping_amount = 80
 totalamount = 0.0
 cart_product = [p for p in Cart.objects.all() if p.user == request.user]
 if cart_product:
  for p in cart_product:
    tempamount = p.quantity * p.product.discounted_price
    amount += tempamount
  totalamount = amount + shipping_amount 

 return render(request, 'app/checkout.html', {'add': add , 'totalamount': totalamount, 'cart_items': cart_items})


def payment_done(request):
 user = request.user
 custid = request.GET.get('custid')
 customer = Customer.objects.get(id=custid)
 cart = Cart.objects.filter(user=user)
 for c in cart:
  OrderPlaced(user=user, customer=customer, product= c.product, quantity=c.quantity).save()
  c.delete()
 return redirect("orders")

def aboutus(request):
  return render(request, 'app/aboutus.html') 




class ProfileView(View):
  def get(self,request):
    form = CustomerProfileForm()
    return render(request, 'app/profile.html', {'form':form, 'active':'btn-primary'})

  def post(self,request):
   form = CustomerProfileForm(request.POST)
   if form.is_valid():
    user = request.user
    name = form.cleaned_data['name']
    locality = form.cleaned_data['locality']
    city = form.cleaned_data['city']
    zipcode = form.cleaned_data['zipcode']
    state = form.cleaned_data['state']
    reg = Customer(user=user,name=name,locality=locality,city=city,zipcode=zipcode,state=state)
    reg.save()
    messages.success(request, 'Congratulations!! Profile Updated Successfully')

    return render(request,'app/profile.html', {'form':form, 'active':'btn-primary'})    



@csrf_exempt
@require_POST
def get_chat_response(request):
    user_message = request.POST.get('message', '').strip()
    if not user_message:
        return JsonResponse({'response': 'Please enter a message.'})

    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        return JsonResponse({'response': 'OpenAI API key is not set on the server.'}, status=500)

    openai.api_key = api_key
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": user_message}],
            max_tokens=150,
            temperature=0.7,
        )
        bot_reply = response.choices[0].message['content'].strip()
        return JsonResponse({'response': bot_reply})
    except Exception as e:
        return JsonResponse({'response': f'Error communicating with OpenAI: {str(e)}'}, status=500)
