import swal from "sweetalert";

function successAlert(title) {
    swal({
        text: title,
        icon: "success",
        button: "close",
    });
}

function confirmationAlert(
    title,
    text
) {
    return swal({
        title: title,
        text: text,
        icon: 'warning',
        buttons: true,
        dangerMode: true,
    });
}

function warningAlert(title) {
    swal({
        text: title,
        icon: "warning",
        button: "close",
    });
}

export { successAlert, confirmationAlert, warningAlert };
