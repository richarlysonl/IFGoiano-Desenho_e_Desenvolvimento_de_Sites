<html>
	<head></head>
	<body>
		<form method="post" action="">
		<Label>Descrição:</Label>
		<input name="descricao" type="text">
		<br>
		<Label>tipo de embalagem:</Label>
		<input name="tp_embalagem" type="text">
		<br>
		<Label>preço:</Label>
		<input name="preco" type="text">
		<br>
		<Label>data de validade:</Label>
		<input name="dt_val" type="date">
		<br>
		<Label>quantidade de impreções</Label>
		<input name="qntd_impres" type="text">
		<br>
		<button type="submit" name="enviar">enviar</button>
		<button type="reset" name="enviar">Limpar</button>
		</form>
	</body>
</html>

<?php
if (isset($_POST['enviar'])){
$descricao = $_POST['descricao'];
$tp_embalagem = $_POST['tp_embalagem'];
$preco = $_POST['preco'];
$dt_val = $_POST['dt_val'];
$qntd_impres = $_POST['qntd_impres'];
for ($cod = 0; $cod < $qntd_impres; $cod++) {
        printf("codigo:".$cod,"\n");
        printf("Descricao:".$descricao."\n");
        printf("tipo de embalagem:".$tp_embalagem."\n");
        printf("preco:".$preco."\n");
        printf("data de validade:".$dt_val."\n");
        
    }
}
?>