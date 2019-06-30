from django.http import HttpResponseForbidden

from secure.models import Token

def authorized(func):
    def wrapper(request):
        try:
            token = Token.objects.get(key=request.COOKIES.get('token'))
        except Token.DoesNotExist:
            return HttpResponseForbidden()

        request.user = token.user
        return func(request)

    return wrapper
