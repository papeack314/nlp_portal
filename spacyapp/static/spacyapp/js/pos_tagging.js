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
            init_table("#pos_tagging_result", ["単語", "品詞"]);
            for (let i = 0; i < data.length; i++){
                add_table_row("#pos_tagging_result", i, [data[i].text, data[i].pos]);
            }
            // ダウンロードボタンの表示
            $("#csv_dl").show();

        }).fail(function(data){
            alert("通信に失敗しました。")
        });
    });

    $("#reset").click(function(){
        $("#pos_tagging_result").empty();     
        $("#csv_dl").hide();   
    });

    $(window).scroll(function(){
        let topBtn = $("#scrollTop");
        if ($(this).scrollTop() > 200){
            topBtn.fadeIn();
        }else{
            topBtn.fadeOut();
        }
    });

    $("#csv_dl").click(function(e){
        e.preventDefault();
        download_csv();
    });

    $("#scrollTop").click(function() {
        $('body,html').animate({
			scrollTop: 0
		}, 500);
    })
});

function init_table(table_id, column_names){
    table_tag = $('<table class="table table-hover table-striped">');
    $(table_id).append(table_tag);
    table_header = $("<thead><tr>");
    table_tag.append(table_header);
    table_header.append("<th>No.</th>");
    for(let i = 0; i < column_names.length; i++){
        table_header.append("<th>" + column_names[i] + "</th>");
    }
    table_tag.append("<tbody>")
}

function add_table_row(table_id, row_num, items){
    row = $(table_id + " table" + " tbody").append("<tr>");
    row.append("<th>" + row_num + "</th>");
    for(let i = 0; i < items.length; i++){
        row.append("<td>" + items[i] + "</td>");
    }
}

function download_csv(){
     // 配列 の用意
     var array_data = [["No.", "単語", "品詞"]];
     for(let i = 0;i < jsondata.length; i++){
        array_data.push([i, jsondata[i].text, jsondata[i].pos])
     }

     // BOM の用意（文字化け対策）
     var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);

     // CSV データの用意
     var csv_data = array_data.map(function(l){return l.join(',')}).join('\r\n');

     var blob = new Blob([bom, csv_data], { type: 'text/csv' });

     var url = (window.URL || window.webkitURL).createObjectURL(blob);

     var a = document.getElementById('downloader');
     a.download = 'PoSdata.csv';
     a.href = url;

     // ダウンロードリンクをクリックする
     $('#downloader')[0].click();
}