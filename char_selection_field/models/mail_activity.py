from odoo import fields, models


class MailActivity(models.Model):
    _inherit = "mail.activity"

    custom_type = fields.CharSelection(
        selection=[
            ("email", "Email"),
            ("sms", "SMS"),
            ("call", "Call"),
            ("other", "Other"),
        ],
        string="Custom Type",
    )
