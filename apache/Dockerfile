FROM httpd:2.4

# Copia solo tu configuración adicional (no reemplaza el httpd.conf original)
COPY my-extra.conf /usr/local/apache2/conf/extra/my-extra.conf

# Incluye tu archivo extra al final del httpd.conf original (opcional, si necesitas que se cargue siempre)
RUN echo "Include conf/extra/my-extra.conf" >> /usr/local/apache2/conf/httpd.conf