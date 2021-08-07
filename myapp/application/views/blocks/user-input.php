<form id="myForm" method="post" class="needs-validation" novalidate>
    <div class="container mt-5">
        <div class="row">
            <div class="col"></div>
            <div class="col-9 ml-mr-auto">
                <div class="form-group">
                    <label for="exampleFormControlInput1" class="mb-2">If you have chance to back in time. <br />How
                        many seconds do you prefer to tick backwards?</label>
                    <input type="number" class="form-control" id="DECREMENT_BY_SECS" placeholder="seconds" min="1"
                        max="9999999999" required>
                    <div class="invalid-feedback">
                        Please provide valid input.
                    </div>
                </div>
            </div>
            <div class="col"></div>
        </div>
        <div class="row mt-2">
            <div class="col"></div>
            <div class="col-9 ">
                <button type="submit" class="btn btn-light mb-2" value="Submit">Go!</button>
            </div>
            <div class="col"></div>
        </div>
    </div>

</form>