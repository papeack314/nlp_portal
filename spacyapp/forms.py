from django import forms

class InputForm(forms.Form):
    input_sentence = forms.CharField(
        label='input_sentence',
        max_length=200,
        required=True,
        widget=forms.TextInput()
    )