<div class="lst_head border-none">
    <p>Total <?=$totalCount?></p>
    <select id="lst_select">
        <!-- <option value="" <?= $category == "" ? "selected" : "" ?>>전체보기</option> -->
        <option value="media" <?= $category == "2" ? "selected" : "" ?>>ILA 보도자료</option>
        <option value="iluvafrica" <?= $category == "1" ? "selected" : "" ?>>이창옥의 아이러브아프리카</option>
    </select>
</div>

<script>
    $(document).ready(() => {
        $('#lst_select').change(function(){
            const category = $(this).val();
            location.href = `/index.php/<?= $nationlink ?>news/${category || ""}`;
        })
    })
</script>
