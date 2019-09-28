from django.urls import path

from . import views

urlpatterns = [
    # 各ページのURL
    path('', views.index, name='index'),
    path('pos_tagging/', views.pos_tagging, name='pos_tagging'),
    path('dependancy_parser/', views.dependancy_parser, name='dependancy_parser'),
    path('named_entity_recognition/', views.named_entity_recognition, name='named_entity_recognition'),
    path('similarity_checker/', views.similarity_checker, name='similarity_checker'),

    # API用のURL
    path('pos_tagging/api/<str:input_text>', views.pos_tagging_api, name="pos_tagging_api"),
    path('dependancy_parser/api/<str:input_text>', views.dependancy_parser_api, name="dependancy_parser_api"),
    path('named_entity_recognition/api/<str:input_text>', views.named_entity_recognition_api, name="named_entity_recognition_api"),
]
