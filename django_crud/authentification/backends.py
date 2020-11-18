import jwt

from django.conf import settings

from rest_framework import authentication, exceptions

from .models import AuthToken


class JWTAuthentication(authentication.BaseAuthentication):
    authentication_header_prefix = 'Bearer'

    def authenticate(self, request):
        request.user = None

        auth_header = authentication.get_authorization_header(request).split()
        auth_header_prefix = self.authentication_header_prefix.lower()

        if not auth_header:
            return None

        if len(auth_header) == 1:
            # Invalid token header. No credentials provided. Do not attempt to
            # authenticate.
            return None

        elif len(auth_header) > 2:
            # Invalid token header. The Token string should not contain spaces.
            # Do not attempt to authenticate.
            return None

        prefix = auth_header[0].decode('utf-8')
        token = auth_header[1].decode('utf-8')

        if prefix.lower() != auth_header_prefix:
            # The auth header prefix is not what we expected. Do not attempt to
            # authenticate.
            return None

        return self._authenticate_credentials(request, token)

    def _authenticate_credentials(self, request, token):
        """
        Если аутентификация прошла успешно,
        возвращает пользователя и токен. Если нет, то выдает ошибку.
        """
        #import pdb; pdb.set_trace()
        try:
            payload = jwt.decode(jwt=token, key=settings.SECRET_KEY)
        except:
            msg = 'Неверная аутентификация. Не удалось декодировать токен.'
            raise exceptions.AuthenticationFailed(msg)

        try:
            user = AuthToken.objects.get(pk=payload['id'])
        except AuthToken.DoesNotExist:
            msg = 'User не найден'
            raise exceptions.AuthenticationFailed(msg)

        return (user, token)
