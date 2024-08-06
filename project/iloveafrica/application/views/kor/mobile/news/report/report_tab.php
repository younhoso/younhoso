<div class="lst_head border-none">
    <p>Total <?=$totalCount?></p>
    <select id="lst_select">
        <!-- <option value="" <?= $category == "" ? "selected" : "" ?>>전체보기</option> -->
        <option value="report" <?= $category == "3" ? "selected" : "" ?>>아프리카 사업 현지 영상</option>
        <option value="campaign" <?= $category == "4" ? "selected" : "" ?>>사업별 캠페인 영상</option>
        <option value="videos" <?= $category == "2" ? "selected" : "" ?>>두루두루 모두 모아 영상</option>
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
