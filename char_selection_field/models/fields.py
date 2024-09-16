from odoo import fields


class CharSelection(fields.Selection):
    def convert_to_cache(self, value, record, validate=True):
        if not validate:
            return value or None
        if value:
            return value
        else:
            return None


fields.CharSelection = CharSelection
