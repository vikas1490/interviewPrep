let _root = document.getElementById("root");
function btnTemp() {
  let _content = `<button class="add-remove">Click me</button>
                       <button class="add-remove">Click me</button>`;
  let ele = $("<div></div>");
  ele.html(_content);
  ele.appendTo(_root);
}
$(document).ready(function () {
  $("#root").on("click", ".add-remove", function () {
    $(this).remove();
    btnTemp();
  });
});
