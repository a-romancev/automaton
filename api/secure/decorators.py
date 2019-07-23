from django.http import HttpResponseForbidden

from secure.models import Token


def authorized(func):
    def wrapper(self, request, *args, **kwargs):
        try:
            token = Token.objects.get(key=request.COOKIES.get('token'))
        except Token.DoesNotExist:
            return HttpResponseForbidden()

        request.user = token.user
        return func(self, request, *args, **kwargs)

    return wrapper
