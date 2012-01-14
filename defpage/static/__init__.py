from pyramid.config import Configurator

def main(global_config, **settings):
    config = Configurator()
    config.setup_registry(settings=settings)
    config.add_static_view("static", "defpage.static:static")
    return config.make_wsgi_app()
