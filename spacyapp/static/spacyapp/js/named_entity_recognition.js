$(function (){
    $("#analyze").click(function(e){
        e.preventDefault();
        $("#pos_tagging_result").empty();
        let input_sentence = $("#input_sentence").val();
        if(input_sentence == ""){
            alert("文章が入力されていません");
            return false;
        }
        $.ajax({
            url: "api/" + input_sentence,
            dataType: "json",
        }).done(function(data){
            jsondata = data
            $("#ner_result").html("<h2 class='mt-4'>検証結果</h2>")
            $("#ner_result").append(jsondata.ner_html)
        }).fail(function(data){
            alert("通信に失敗しました。")
        });
    });

    $("#reset").click(function(){
        $("#ner_result").empty();     
    });
});